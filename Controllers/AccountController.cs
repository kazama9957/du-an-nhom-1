using QLNS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QLNS.Controllers
{
    public class AccountController : Controller
    {
        private QLNSEntities db = new QLNSEntities();

        // GET: Login
        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public ActionResult LoginAdmin(string Username, string Password)
        {
            var admin = db.UserAccounts.FirstOrDefault(x =>
                x.Username == Username &&
                x.PasswordHash == Password &&
                x.Role == "Admin" &&
                x.EmployeeID == null // đảm bảo đúng Admin
            );

            if (admin == null)
            {
                ViewBag.Error = "Sai tài khoản hoặc mật khẩu Admin!";
                return View("Login");
            }

            Session["UserRole"] = "Admin";
            Session["UserID"] = admin.UserID;
            Session["Username"] = admin.Username;

            return RedirectToAction("Index", "Home");
        }

        [HttpPost]
        public ActionResult LoginNV(string Username, string Password)
        {
            var user = db.UserAccounts.FirstOrDefault(x => x.Username == Username);

            if (user == null)
            {
                ViewBag.Error = "Tài khoản không tồn tại!";
                return View("Login");
            }

            if (user.PasswordHash != Password)
            {
                ViewBag.Error = "Sai mật khẩu!";
                return View("Login");
            }

            if (user.Role != "Employee")
            {
                ViewBag.Error = "Tài khoản này không phải Nhân viên!";
                return View("Login");
            }

            Session["UserRole"] = "Employee";
            Session["UserID"] = user.UserID;
            Session["Username"] = user.Username;

            return RedirectToAction("Index", "Home");
        }

        public ActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Register(UserAccount user)
        {
            if (string.IsNullOrEmpty(user.Username) || string.IsNullOrEmpty(user.PasswordHash))
            {
                ViewBag.Error = "Vui lòng nhập đầy đủ thông tin!";
                return View();
            }

            var exist = db.UserAccounts.FirstOrDefault(x => x.Username == user.Username);
            if (exist != null)
            {
                ViewBag.Error = "Tên đăng nhập đã tồn tại!";
                return View();
            }

            user.Role = "Admin";
            user.EmployeeID = null;

            db.UserAccounts.Add(user);
            db.SaveChanges();

            return RedirectToAction("Login");
        }

        public ActionResult Logout()
        {
            Session.Clear();
            return RedirectToAction("Login");
        }
    }
}
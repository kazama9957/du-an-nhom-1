using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QLNS.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            if (Session["Username"] == null)
            {
                return RedirectToAction("Login", "Account");
            }

            ViewBag.User = Session["Username"];
            ViewBag.Role = Session["UserRole"];

            return View();
        }
    }
}
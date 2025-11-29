using System;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web.Mvc;
using QLNS.Models;
using QLNS.Filters;
namespace QLNS.Controllers
{
    public class EmployeeProfileController : Controller
    {
        private QLNSEntities db = new QLNSEntities();

        public ActionResult Index()
        {
            var list = db.EmployeeProfiles;
            return View(list.ToList());
        }

        public ActionResult Details(int? id)
        {
            if (id == null) return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            var item = db.EmployeeProfiles.Find(id);
            if (item == null) return HttpNotFound();
            return View(item);
        }

        public ActionResult Create()
        {
            ViewBag.EmployeeID = new SelectList(db.Employees, "EmployeeID", "FullName");
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(EmployeeProfile employeeProfile)
        {
            if (ModelState.IsValid)
            {
                db.EmployeeProfiles.Add(employeeProfile);
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.EmployeeID = new SelectList(db.Employees, "EmployeeID", "FullName");
            return View(employeeProfile);
        }

        public ActionResult Edit(int? id)
        {
            if (id == null) return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            var item = db.EmployeeProfiles.Find(id);
            if (item == null) return HttpNotFound();
            ViewBag.EmployeeID = new SelectList(db.Employees, "EmployeeID", "FullName");
            return View(item);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(EmployeeProfile employeeProfile)
        {
            if (ModelState.IsValid)
            {
                db.Entry(employeeProfile).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.EmployeeID = new SelectList(db.Employees, "EmployeeID", "FullName");
            return View(employeeProfile);
        }

        public ActionResult Delete(int? id)
        {
            if (id == null) return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            var item = db.EmployeeProfiles.Find(id);
            if (item == null) return HttpNotFound();
            return View(item);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            var dep = db.EmployeeProfiles.Find(id);
            if (dep == null)
            {
                return HttpNotFound();
            }

            db.EmployeeProfiles.Remove(dep);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing) db.Dispose();
            base.Dispose(disposing);
        }
    }
}

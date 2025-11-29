using System;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web.Mvc;
using QLNS.Models;
using QLNS.Filters;
namespace QLNS.Controllers
{
    public class AttendanceController : Controller
    {
        private QLNSEntities db = new QLNSEntities();

        public ActionResult Index()
        {
            var list = db.Attendances;
            return View(list.ToList());
        }

        public ActionResult Details(int? id)
        {
            if (id == null) return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            var item = db.Attendances.Find(id);
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
        public ActionResult Create(Attendance attendance)
        {
            if (ModelState.IsValid)
            {
                db.Attendances.Add(attendance);
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.EmployeeID = new SelectList(db.Employees, "EmployeeID", "FullName");
            return View(attendance);
        }

        public ActionResult Edit(int? id)
        {
            if (id == null) return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            var item = db.Attendances.Find(id);
            if (item == null) return HttpNotFound();
            ViewBag.EmployeeID = new SelectList(db.Employees, "EmployeeID", "FullName");
            return View(item);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(Attendance attendance)
        {
            if (ModelState.IsValid)
            {
                var existing = db.Attendances.Find(attendance.AttendanceID);
                if (existing == null)
                {
                    return HttpNotFound();
                }
                existing.EmployeeID = attendance.EmployeeID;
                existing.WorkDate = attendance.WorkDate;
                existing.CheckIn = attendance.CheckIn;
                existing.CheckOut = attendance.CheckOut;

                if (existing.CheckIn.HasValue && existing.CheckOut.HasValue)
                {
                    existing.WorkHours =
                        (decimal)(existing.CheckOut.Value - existing.CheckIn.Value).TotalHours;
                }

                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.EmployeeID = new SelectList(db.Employees, "EmployeeID", "FullName", attendance.EmployeeID);
            return View(attendance);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            var item = db.Attendances.Find(id);
            db.Attendances.Remove(item);
            db.SaveChanges();
            return RedirectToAction("Index");
        }
        public ActionResult Delete(int id)
        {
            var item = db.Attendances.Find(id);
            if (item == null)
            {
                return HttpNotFound();
            }
            return View(item);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing) db.Dispose();
            base.Dispose(disposing);
        }
    }
}

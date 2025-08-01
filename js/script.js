
document.addEventListener("DOMContentLoaded", function () {
  // মোবাইল মেনু toggle
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-links");

  toggle.addEventListener("click", () => {
    nav.classList.toggle("active");
  });

  // active মেনু highlighting
  const links = document.querySelectorAll("nav ul li a");
  const currentPage = location.pathname.split("/").pop();

  links.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  // স্লাইডার
  const slides = document.querySelectorAll(".slide");
  let index = 0;

  function showSlide(i) {
    slides.forEach((slide, idx) => {
      slide.classList.remove("active");
      if (idx === i) {
        slide.classList.add("active");
      }
    });
  }

  function nextSlide() {
    index = (index + 1) % slides.length;
    showSlide(index);
  }

  // প্রথম slide দেখাও
  showSlide(index);

  // প্রতি ৪ সেকেন্ডে slide পরিবর্তন
  setInterval(nextSlide, 4000);
});
const toggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

toggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

//ফরম সাবমিট(যোগাযোগ ও অনুদান)
window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const success = urlParams.get("success");
  const name = urlParams.get("name");
  const from = urlParams.get("from");

  if (success === "1" && name && from) {
    const decodedName = decodeURIComponent(name);
    let messageText = "";
    let messageHTML = "";

    if (from === "contact") {
      messageText = `প্রিয় ${decodedName}, ধন্যবাদ! আপনার বার্তা সফলভাবে পাঠানো হয়েছে।`;
      alert(messageText);

      messageHTML = `<div style="padding:10px; background-color:#e6ffe6; border-left:5px solid green; font-size:17px; margin-bottom:10px;">
        <strong>${decodedName}</strong>, ধন্যবাদ! আপনার বার্তা সফলভাবে পাঠানো হয়েছে! আল-ইখলাছ ফাউন্ডেশন থেকে আপনার সাথে দ্রুত যোগাযোগ করা হবে। ✅
      </div>`;
    } else if (from === "donation") {
      messageText = `প্রিয় ${decodedName}, ধন্যবাদ! আপনার অনুদান সফলভাবে পাঠানো হয়েছে।`;
      alert(messageText);

      messageHTML = `<div style="padding:10px; background-color:#e6ffe6; border-left:5px solid green; font-size:17px; margin-bottom:10px;">
        <strong>${decodedName}</strong>, ধন্যবাদ! আপনার অনুদান সফলভাবে পাঠানো হয়েছে! আল্লাহ আপনাকে উত্তম প্রাতিদান দান করুন! ✅
      </div>`;
    } else if (from === "ask") {
      messageText = `প্রিয় ${decodedName}, আপনার প্রশ্ন সফলভাবে জমা হয়েছে।`;
      alert(messageText);

      messageHTML = `<div style="padding:10px; background-color:#e6ffe6; border-left:5px solid green; font-size:17px; margin-bottom:10px;">
        <strong>${decodedName}</strong>, ✅ আপনার প্রশ্ন সফলভাবে জমা হয়েছে। ধন্যবাদ!
      </div>`;
    }


    // HTML মেসেজ ফর্মের উপরে দেখানো
    if (messageHTML) {
      const form = document.querySelector("form");
      if (form) {
        const div = document.createElement("div");
        div.innerHTML = messageHTML;
        form.parentNode.insertBefore(div, form);
      }
    }

    // URL থেকে success=name=from মুছে ফেলা
    window.history.replaceState({}, document.title, window.location.pathname);
  }

  // পেমেন্ট মেথড অনুযায়ী তথ্য দেখানো
  const methodSelector = document.getElementById("payment-method");
  const infoDiv = document.getElementById("payment-info");

  if (methodSelector && infoDiv) {
    methodSelector.addEventListener("change", function () {
      const method = this.value;
      if (method === "bKash") {
        infoDiv.innerHTML = "<strong>bKash নম্বর:</strong> 01311032271<br>নোট: উক্ত নাম্বারে মোবাইলে বিকাশের মাধ্যমে সেন্ড মানি করুন। সেন্ড মানি কৃত টাকার পরিমান উপরের অনুদানের ঘরে লিখে “অনুদান পাঠান “ বাটনে ক্লিক করুন!";
      } else if (method === "Nagad") {
        infoDiv.innerHTML = "<strong>Nagad নম্বর:</strong> 01311032271<br>নোট: উক্ত নাম্বারে মোবাইলে নগদের মাধ্যমে সেন্ড মানি করুন। সেন্ড মানি কৃত টাকার পরিমান উপরের অনুদানের ঘরে লিখে “অনুদান পাঠান “ বাটনে ক্লিক করুন!";
      } else if (method === "Bank") {
        infoDiv.innerHTML = "<strong>ব্যাংক তথ্য:</strong><br>অ্যাকাউন্ট: 123456789<br>ব্যাংক: ইসলামী ব্যাংক<br>ব্রাঞ্চ: ঢাকা সদর";
      } else {
        infoDiv.innerHTML = "সরাসরি টাকা প্রদান করতে আল-ইখলাছ ফাউন্ডেশনের কার্যালয়ে যোগাযোগ করুন। ধন্যবাদ।";
      }
      infoDiv.style.display = "block";
    });
  }
};
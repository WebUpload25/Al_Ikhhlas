<?php
// ডাটাবেস কানেকশন
$host = "localhost";
$user = "root";
$pass = "";
$db   = "ikhhlas_db";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
  die("ডাটাবেস সংযোগ ব্যর্থ: " . $conn->connect_error);
}

// ইনপুট ডাটা নেওয়া
$name = $_POST['name'] ?? '';
$mobile = $_POST['mobile'] ?? '';
$email = $_POST['email'] ?? ''; // এখন এটি ঐচ্ছিক
$message = $_POST['message'] ?? '';

// ইনপুট যাচাই করা (ইমেইল এখন আর আবশ্যক নয়)
if ($name && $mobile && $message) {
  $stmt = $conn->prepare("INSERT INTO contacts (name, mobile, email, message) VALUES (?, ?, ?, ?)");
  $stmt->bind_param("ssss", $name, $mobile, $email, $message);
  
  if ($stmt->execute()) {
    $encodedName = urlencode($name);
    header("Location: contact.html?success=1&name=$encodedName&from=contact");
    exit();
  } else {
    echo "❌ ডেটা সেভ করা যায়নি: " . $stmt->error;
  }

  $stmt->close();
} else {
  echo "⚠️ নাম, মোবাইল ও বার্তা বাধ্যতামূলক।";
}

$conn->close();
?>
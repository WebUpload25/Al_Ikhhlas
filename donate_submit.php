<?php
// ডাটাবেস কানেকশন
$host = "localhost";
$user = "root";
$pass = "";
$db   = "ikhhlas_db";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
  header("Location: donate.html?error=db");
  exit();
}

$name = $_POST['donor-name'] ?? '';
$amount = $_POST['donation-amount'] ?? '';
$method = $_POST['payment-method'] ?? '';

if ($name && $amount && $method) {
  $stmt = $conn->prepare("INSERT INTO donations (name, amount, method) VALUES (?, ?, ?)");
  $stmt->bind_param("sss", $name, $amount, $method);

  if ($stmt->execute()) {
    header("Location: donate.html?success=1&name=" . urlencode($name) . "&from=donation");
    exit();
  } else {
    echo "❌ ডেটা সেভ করা যায়নি: " . $stmt->error;
  }

  $stmt->close();
} else {
  echo "⚠️ সব তথ্য প্রদান করুন।";
}

$conn->close();
?>
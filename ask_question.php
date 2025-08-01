<?php
// ডাটাবেস কানেকশন
$host = "localhost";
$user = "root";
$pass = "";
$db   = "ikhhlas_db";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("সংযোগ ব্যর্থ: " . $conn->connect_error);
}

// ফর্ম থেকে ডেটা নেওয়া
$name = $_POST['name'];
$question = $_POST['question'];

// ইনসার্ট কুয়েরি
$sql = "INSERT INTO questions (name, question) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $name, $question);

if ($stmt->execute()) {
    // ডেটা সাকসেস হলে ask.html পেজে রিডাইরেক্ট করো success=1 সহ
    header("Location: ask.html?success=1&name=" . urlencode($name) . "&from=ask");
    exit();
} else {
    echo "❌ ত্রুটি: " . $conn->error;
}

$stmt->close();
$conn->close();
?>
<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once "config/db.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $fname   = $_POST['firstName'];
    $lname   = $_POST['lastName'];
    $email   = $_POST['email'];
    $phone   = $_POST['phone'];
    $gender  = $_POST['gender'];
    $dob     = $_POST['dob'];
    $address = $_POST['address'];
    $jobLoc  = $_POST['jobLocation'];
    $jobRole = $_POST['jobRole'];
    $edu     = $_POST['education'];
    $exp     = $_POST['experience'];

    // File upload
    $resumeName = $_FILES['resume']['name'];
    $tmpName    = $_FILES['resume']['tmp_name'];

    $newName = time() . "_" . $resumeName;
    $path    = "uploads/" . $newName;

    if (!move_uploaded_file($tmpName, $path)) {
        $msg = "Resume upload failed";
    } else {

$sql = "INSERT INTO candidates_detail
(cfirstname, clastname, cemail, cphone, gender, cdob, caddress,
 cjoblocation, cjobrole, education, experience, cresumefile, capplieddate)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param(
    "ssssssssssss",
    $fname,
    $lname,
    $email,
    $phone,
    $gender,
    $dob,
    $address,
    $jobLoc,
    $jobRole,
    $edu,
    $exp,
    $newName
);
        if ($stmt->execute()) {
    $msg = "Application submitted successfully";
} else {
    $msg = "DB Error: " . $stmt->error;
}
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Apply Now</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="form-container">
    <h2>Apply Now</h2>

    <?php if (!empty($msg)) echo "<p>$msg</p>"; ?>

    <form method="POST" enctype="multipart/form-data">

        <div class="row">
            <div class="field">
                <label>First Name *</label>
                <input type="text" name="firstName" required>
            </div>
            <div class="field">
                <label>Last Name *</label>
                <input type="text" name="lastName" required>
            </div>
        </div>

        <div class="row">
            <div class="field">
                <label>Email *</label>
                <input type="email" name="email" required>
            </div>
            <div class="field">
                <label>Phone *</label>
                <input type="number" name="phone" required>
            </div>
        </div>

        <div class="row">
            <div class="field">
                <label>Gender *</label>
                <select name="gender" required>
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div class="field">
                <label>Date of Birth *</label>
                <input type="date" name="dob" required>
            </div>
        </div>

        <div class="field">
            <label>Current Address *</label>
            <textarea name="address" required></textarea>
        </div>

        <div class="row">
            <div class="field">
                <label>Preferred Job Location *</label>
                <input type="text" name="jobLocation" required>
            </div>
            <div class="field">
                <label>Preferred Job Role *</label>
                <input type="text" name="jobRole" required>
            </div>
        </div>

        <div class="field">
            <label>Education *</label>
            <div class="checkbox-group">
                <label><input type="radio" name="education" value="Graduation"> Graduation</label>
                <label><input type="radio" name="education" value="Post Graduation"> Post Graduation</label>
                <label><input type="radio" name="education" value="Other"> Other</label>
            </div>
        </div>

        <div class="field">
            <label>Experience *</label>
            <select name="experience" required>
                <option value="">Select</option>
                <option value="0-1 Year">0-1 Year</option>
                <option value="2-4 Years">2-4 Years</option>
                <option value="5-8 Years">5-8 Years</option>
                <option value="8-10 Years">8-10 Years</option>
                <option value="10+ Years">10+ Years</option>
                <option value="Student">Student</option>
            </select>
        </div>

        <div class="field">
            <label>Upload Resume (PDF / DOC) *</label>
            <input type="file" name="resume" accept=".pdf,.doc,.docx" required>
        </div>


        <button type="submit">Submit Application</button>
    </form>
</div>

</body>
</html>
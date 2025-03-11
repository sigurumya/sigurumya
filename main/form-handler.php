<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // フォームから送信されたデータを取得
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // メールの設定
    $to = "sigurumya@gmail.com"; // 受信先のメールアドレス
    $subject = "お問い合わせフォームからのメッセージ";
    $body = "名前: $name\nメールアドレス: $email\nメッセージ:\n$message";
    $headers = "From: $email";

    // メールを送信
    if (mail($to, $subject, $body, $headers)) {
        echo "メッセージが送信されました。";
    } else {
        echo "メッセージの送信に失敗しました。";
    }
} else {
    echo "無効なリクエストです。";
}
?>

package com.rakib.project.service;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class EmailService {

private final JavaMailSender javaMailSender;

public EmailService(JavaMailSender javaMailSender) {
    this.javaMailSender = javaMailSender;
}
public void sendSimpleMail(String to, String subject, String body)throws MessagingException {
    MimeMessage mimeMessage = javaMailSender.createMimeMessage();
    MimeMessageHelper helper = new MimeMessageHelper(mimeMessage,true,"UTF-8");
    helper.setTo(to);
    helper.setSubject(subject);
    helper.setText(body, true);
    javaMailSender.send(mimeMessage);
}

}

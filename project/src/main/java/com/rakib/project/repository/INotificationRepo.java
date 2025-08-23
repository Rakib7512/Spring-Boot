package com.rakib.project.repository;

import com.rakib.project.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface INotificationRepo extends JpaRepository<Notification, Long> {

//    List<Notification> findByRecipientIdAndReadStatusFalse(Long recipientId);
}

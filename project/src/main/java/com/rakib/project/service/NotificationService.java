package com.rakib.project.service;

import com.rakib.project.entity.Notification;
import com.rakib.project.repository.INotificationRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {
    private final INotificationRepo notificationRepository;

    public NotificationService(INotificationRepo notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public void createNotification(String message, Long recipientId) {
        Notification notification = new Notification(message, recipientId);
        notificationRepository.save(notification);
    }

    public List<Notification> getUnreadNotifications(Long recipientId) {
        return notificationRepository.findByRecipientIdAndReadStatusFalse(recipientId);
    }

    public void markAsRead(Long id) {
        Notification n = notificationRepository.findById(id).orElseThrow();
        n.setReadStatus(true);
        notificationRepository.save(n);
    }
}

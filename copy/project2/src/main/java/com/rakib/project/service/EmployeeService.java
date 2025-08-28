package com.rakib.project.service;




import com.rakib.project.entity.Employee;
import com.rakib.project.repository.IEmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class EmployeeService {
    @Autowired
    private IEmployeeRepo employeeRepository;

    public List<Employee> getAll() {
        return employeeRepository.findAll();
    }

    public Optional<Employee> getById(Long id) {
        return employeeRepository.findById(id);
    }

    public Employee save(Employee employee) {
        return employeeRepository.save(employee);
    }

    public void delete(Long id) {
        employeeRepository.deleteById(id);
    }

    public Employee getProfileByUserId(int userId) {
        return employeeRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Job Seeker not found"));
    }

}
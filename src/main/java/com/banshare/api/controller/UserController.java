package com.banshare.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.banshare.api.dao.UserDao;
import com.banshare.api.model.Users;
import com.banshare.api.payload.request.LoginRequest;
import com.banshare.api.payload.request.UserRequest;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class UserController {

	@Autowired
	UserDao userDao;
	
	@Autowired
	public PasswordEncoder passwordEncoder;

	@PostMapping("/users")
	public ResponseEntity<String> createUser(@RequestBody LoginRequest user) {
		try {
			userDao.save(new Users(user.getUsername(), passwordEncoder.encode(user.getPassword()), 3));
			return new ResponseEntity<>("User was created successfully.", HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/users/{id}")
	public ResponseEntity<Users> getUserById(@PathVariable("id") int id) {
		Users user = userDao.findByUserId(id);

		if (user != null) {
			return new ResponseEntity<>(user, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PutMapping("/users")
	public ResponseEntity<String> updateUser(@RequestBody UserRequest user) {
		System.out.println("UserRequest : " + user);
		Users _user = userDao.findByUsername(user.getUsername());

		if (_user != null) {
			_user.setUserId(_user.getUserId());
			_user.setUsername(user.getUsername());
			_user.setPassword(passwordEncoder.encode(user.getPassword()));
			_user.setRole(_user.getRole());
			if (user.getRole() > 0) {
				_user.setRole(user.getRole());
			}
			System.out.println("updateUser : " + _user);

			userDao.update(_user);
			return new ResponseEntity<>("User was updated successfully.", HttpStatus.OK);
		} else {
			return new ResponseEntity<>("Cannot find User with username=" + user.getUsername(), HttpStatus.NOT_FOUND);
		}
	}
}

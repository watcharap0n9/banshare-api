package com.banshare.api.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.banshare.api.cache.CacheBlacklistToken;
import com.banshare.api.payload.request.LoginRequest;
import com.banshare.api.payload.response.JwtResponse;
import com.banshare.api.service.JwtUserDetailsService;
import com.banshare.api.util.TokenManager;

@RestController
@CrossOrigin
@RequestMapping("/auth")
public class AuthController {
	private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

	@Autowired
	private JwtUserDetailsService userDetailsService;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private TokenManager tokenManager;

	@PostMapping("/login")
	public ResponseEntity<JwtResponse> createToken(@RequestBody LoginRequest request) throws Exception {
		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
		} catch (DisabledException e) {
			throw new Exception("USER_DISABLED", e);
		} catch (BadCredentialsException e) {
			throw new Exception("INVALID_CREDENTIALS", e);
		}
		final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
		final String jwtToken = tokenManager.generateJwtToken(userDetails);
		logger.info("/login with username : " + request.getUsername());
		return ResponseEntity.ok(new JwtResponse(jwtToken));
	}

	@PostMapping("/logout")
	public ResponseEntity<String> logout(@RequestHeader("Authorization") String token) throws Exception {
		try {
			token = token.replaceAll("Bearer ", "");
			String username = tokenManager.getUsernameFromToken(token);
			logger.info("/logout with username : " + username);
			CacheBlacklistToken.getInstance().set(username, token);
			SecurityContextHolder.clearContext();
		} catch (Exception e) {
			logger.error("Logout exception:",e);
		}
		
		return ResponseEntity.ok("You have successfully been logged out");
	}
}

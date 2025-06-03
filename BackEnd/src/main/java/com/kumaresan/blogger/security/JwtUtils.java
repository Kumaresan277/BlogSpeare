package com.kumaresan.blogger.security;

import java.security.Key;
import java.util.Date;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtils {

		private final String SECRET = "mysecretkeyforjwttokengenerationwhichshouldbelong";
		private final long expiration = 1000 * 60 * 60 *10;
		private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());
		
		public String generateToken(String username) {
			return Jwts.builder()
					.setSubject(username)
					.setIssuedAt(new Date())
					.setExpiration(new Date(System.currentTimeMillis() + expiration))
					.signWith(key, SignatureAlgorithm.HS256)
					.compact();
		}
		
		
		 public String extractUsername(String token) {	return Jwts.parserBuilder()
					.setSigningKey(key)
					.build()
					.parseClaimsJws(token)
					.getBody()
					.getSubject(); }
		 
		
		public boolean validateToken(String token, UserDetails userDetails) {
			//final String username = extractUsername(token);
			try {
			Claims claim = Jwts
					.parserBuilder()
					.setSigningKey(key)
					.build()
					.parseClaimsJws(token)
					.getBody();
			String username = claim.getSubject();
					
			return username.equals(userDetails.getUsername());
			}
			catch (JwtException | IllegalArgumentException e) {
				return false;
			}
		}
}

package com.kumaresan.blogger.controller;

import java.security.Principal;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kumaresan.blogger.dto.BlogRequest;
import com.kumaresan.blogger.dto.CommentRequest;
import com.kumaresan.blogger.service.BlogService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/blogs")
@CrossOrigin( origins = "http://localhost:5173")
@RequiredArgsConstructor
public class BlogController {
	
	private final BlogService blogService;

	
	@GetMapping
	public ResponseEntity<?> getAllBlogs() {
		return blogService.getAllBlogs();
	}
	
	@GetMapping("/my")
	public ResponseEntity<?> getMyBlogs(Principal principal) {
		return blogService.getBlogsByUser(principal);
	}
	
	@PostMapping
	public ResponseEntity<?> createBlog(@RequestBody BlogRequest request, Principal principal) {
		return blogService.createBlog(request, principal);
	}
	
	@PostMapping("/{id}")
	public ResponseEntity<?> updateBlog(@PathVariable Long id, @RequestBody BlogRequest request, Principal principal) {
		return blogService.updateBlog(id, request, principal);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteBlog(@PathVariable Long id, Principal principal) {
		return blogService.deleteBlog(id, principal);
	}
	
	@PostMapping("/{id}/like")
	public ResponseEntity<?> likeBlog(@PathVariable Long id) {
		return blogService.likeBlog(id);
	}
	
	@PostMapping("/{id}/comments")
	public ResponseEntity<?> commentBlog(@PathVariable Long id, @RequestBody CommentRequest commentRequest) {
		return blogService.commentBLog(id, commentRequest);
	}
	
}

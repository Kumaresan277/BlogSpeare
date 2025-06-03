package com.kumaresan.blogger.service;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.kumaresan.blogger.dto.BlogRequest;
import com.kumaresan.blogger.dto.CommentRequest;
import com.kumaresan.blogger.model.Blog;
import com.kumaresan.blogger.model.Comment;
import com.kumaresan.blogger.model.User;
import com.kumaresan.blogger.repository.BlogRepository;
import com.kumaresan.blogger.repository.CommentRepository;
import com.kumaresan.blogger.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import java.util.List;
@RequiredArgsConstructor
@Service
public class BlogService {
	@Autowired
	BlogRepository blogRepository;
	@Autowired
	UserRepository userRepository;
	@Autowired
	CommentRepository commentRepository;
	
	
		
	public ResponseEntity<?> getAllBlogs() {
		return ResponseEntity.ok(blogRepository.findAll());
	}
	
	public ResponseEntity<?> getBlogsByUser(Principal principal) {
		User user = userRepository.findByUsername(principal.getName()).orElseThrow(); 
		return ResponseEntity.ok(blogRepository.findByAuthor(user));
	}

	public ResponseEntity<?> createBlog(BlogRequest request, Principal principal) {
		User user = userRepository.findByUsername(principal.getName()).orElseThrow();
		Blog blog = new Blog();
		blog.setTitle(request.getTitle());
		blog.setContent(request.getContent());
		blog.setAuthor(user);
		blogRepository.save(blog);
		return ResponseEntity.ok(blog);
	}

	public ResponseEntity<?> updateBlog(Long id, BlogRequest request, Principal principal) {
		Blog blog = blogRepository.findById(id).orElseThrow();
		if(!blog.getAuthor().getUsername().equals(principal.getName())) {
			return ResponseEntity.status(403).body("Unauthorized");
		}
		blog.setTitle(request.getTitle());
		blog.setContent(request.getContent());
		blogRepository.save(blog);
		return ResponseEntity.ok(blog);
	}

	public ResponseEntity<?> deleteBlog(Long id, Principal principal) {
		Blog blog = blogRepository.findById(id).orElseThrow();
		if (!blog.getAuthor().getUsername().equals(principal.getName())) {
			return ResponseEntity.status(403).body("Unauthorized");
		}
		blogRepository.delete(blog);
		return ResponseEntity.ok("Blog deleted");
	}

	public ResponseEntity<?> likeBlog(Long id) {
		Blog blog =blogRepository.findById(id).orElseThrow();
		blog.setLikes(blog.getLikes() + 1);
		blogRepository.save(blog);
		return ResponseEntity.ok("Blog Liked");
	}

	public ResponseEntity<?> commentBLog(Long id, CommentRequest commentRequest) {
		Blog blog = blogRepository.findById(id).orElseThrow();
		Comment comment = new Comment();
		comment.setContent(commentRequest.getContent());
		comment.setBlog(blog);
		commentRepository.save(comment);
		return ResponseEntity.ok("Comment added");
	}
	
	
	
	
	
	
	
}

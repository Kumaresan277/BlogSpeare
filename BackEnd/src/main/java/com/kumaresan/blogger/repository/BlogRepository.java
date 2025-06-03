package com.kumaresan.blogger.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kumaresan.blogger.model.Blog;
import com.kumaresan.blogger.model.User;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {
	List<Blog> findByAuthor(User user);

}

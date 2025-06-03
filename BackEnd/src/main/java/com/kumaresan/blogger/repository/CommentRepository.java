package com.kumaresan.blogger.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kumaresan.blogger.model.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long>{

}

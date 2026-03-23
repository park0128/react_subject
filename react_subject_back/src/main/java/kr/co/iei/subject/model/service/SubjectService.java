package kr.co.iei.subject.model.service;

import kr.co.iei.subject.model.dao.SubjectDao;
import kr.co.iei.subject.model.vo.Subject;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SubjectService {

	@Autowired
    private SubjectDao subjectDao;

	public List<Subject> selectSubjectList(String keyword, String category, Integer level, Integer order) {
		// TODO Auto-generated method stub
		return subjectDao.selectSubjectList(keyword, category, level, order);
	}

   
   
}
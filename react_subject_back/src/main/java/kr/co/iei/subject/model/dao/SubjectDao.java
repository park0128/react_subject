package kr.co.iei.subject.model.dao;

import java.util.List;
import java.util.Map;

import kr.co.iei.subject.model.vo.Subject;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SubjectDao {

	List<Subject> selectSubjectList(String keyword, String category, Integer level, Integer order);

}

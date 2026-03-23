package kr.co.iei.subject.controller;

import kr.co.iei.subject.model.service.SubjectService;
import kr.co.iei.subject.model.vo.Subject;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/subjects")
@CrossOrigin(origins = "*")
public class SubjectController {

	@Autowired
    private SubjectService subjectService;

    @GetMapping
    public ResponseEntity<List<Subject>> selectSubjectList(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Integer level,
            @RequestParam(defaultValue = "0") Integer order
    ) {
        List<Subject> subjectList = subjectService.selectSubjectList(keyword, category, level, order);
        return ResponseEntity.ok(subjectList);
    }
}
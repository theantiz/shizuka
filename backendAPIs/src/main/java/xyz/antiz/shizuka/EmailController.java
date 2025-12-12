package xyz.antiz.shizuka;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@CrossOrigin (origins = "*")
@RequestMapping("/api/email")
public class EmailController {

    private final EmailService emailService;
    @PostMapping("/reply")
    public ResponseEntity<String> getReply(@RequestBody EmailRequest request) {
        String reply = emailService.generateEmailReply(request); // <-- updated method name
        return ResponseEntity.ok(reply);
    }

}






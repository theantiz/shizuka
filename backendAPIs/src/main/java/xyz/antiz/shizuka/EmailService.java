package xyz.antiz.shizuka;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@Service
public class EmailService {

    private final WebClient webClient;
    private final String apiKey;

    public EmailService(
            WebClient.Builder webClientBuilder,
            @Value("${gemini.api.url}") String baseUrl,
            @Value("${gemini.api.key}") String apiKey) {

        this.webClient = webClientBuilder
                .baseUrl(baseUrl)
                .build();

        this.apiKey = apiKey;
    }

    public String generateEmailReply(EmailRequest emailRequest) {
        String prompt = buildPrompt(emailRequest);

        Map<String, Object> part = Map.of("text", prompt);
        Map<String, Object> content = Map.of("parts", List.of(part));
        Map<String, Object> body = Map.of("contents", List.of(content));

        String response = webClient.post()
                .uri("/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(body)   // Jackson escapes HTML/quotes correctly
                .retrieve()
                .onStatus(HttpStatusCode::isError, clientResponse ->
                        clientResponse.bodyToMono(String.class).flatMap(errorBody ->
                                Mono.error(new RuntimeException("Gemini error: " + errorBody))
                        )
                )
                .bodyToMono(String.class)
                .block();

        return extractResponseContent(response);
    }


    private String extractResponseContent(String response) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response);

            // candidates[0].content.parts[0].text
            JsonNode textNode = root.path("candidates")
                    .path(0)
                    .path("content")
                    .path("parts")
                    .path(0)
                    .path("text");

            return textNode.isMissingNode()
                    ? "No text returned"
                    : textNode.asText();

        } catch (Exception e) {
            throw new RuntimeException("Error parsing Gemini response: " + response, e);
        }
    }

    private String buildPrompt(EmailRequest emailRequest) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Generate a email reply for the following email(make sure only mail so i can copy and paste directly). ");

        if (emailRequest.getTone() != null && !emailRequest.getTone().isEmpty()) {
            prompt.append("Use a ").append(emailRequest.getTone()).append(" tone. ");
        }

        prompt.append("Original Email:\n").append(emailRequest.getEmailContent());
        return prompt.toString();
    }
}

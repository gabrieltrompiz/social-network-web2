package servlets;

import com.fasterxml.jackson.databind.ObjectMapper;
import handlers.SessionHandler;
import models.Response;
import models.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.stream.Collectors;

@WebServlet(urlPatterns = "/checkEmail", name = "Check Email Servlet")
public class CheckEmailServlet extends HttpServlet {

  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    ObjectMapper objectMapper = new ObjectMapper();
    String email = req.getParameter("email");
    Response<?> response = new Response<>();
    if(SessionHandler.checkEmail(email)) {
      response.setStatus(409);
      response.setMessage("Email already in use");
    } else {
      response.setStatus(200);
      response.setMessage("Email available");
    }
    resp.setStatus(response.getStatus());
    resp.getWriter().print(objectMapper.writeValueAsString(response));
  }
}

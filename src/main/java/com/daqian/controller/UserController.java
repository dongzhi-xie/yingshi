package com.daqian.controller;

import com.daqian.pojo.User;
import com.daqian.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping("/select")
    public ModelAndView selectAll(){
        ModelAndView mv = new ModelAndView();
        User user = userService.selectUser("1");
        mv.addObject("user", user);
        mv.setViewName("user");
        return mv;
    }
}

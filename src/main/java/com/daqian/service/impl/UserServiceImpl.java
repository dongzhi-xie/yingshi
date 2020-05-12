package com.daqian.service.impl;

import com.daqian.dao.UserDao;
import com.daqian.pojo.User;
import com.daqian.service.UserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class UserServiceImpl implements UserService {
    @Resource
    private UserDao dao;

    @Override
    public User selectUser(String Id) {
        return dao.selectAll(Id);
    }
}

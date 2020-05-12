package com.daqian.pojo;


import org.apache.ibatis.type.Alias;

@Alias("user")
public class User {
    private String id;
    private String name;
    private String password;
    private String home;
    private String j_id;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    public String getHome() {
        return home;
    }

    public void setHome(String home) {
        this.home = home;
    }
    public String getJ_id() {
        return j_id;
    }

    public void setJ_id(String j_id) {
        this.j_id = j_id;
    }

    public User(String id, String name, String password, String home, String j_id) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.home = home;
        this.j_id = j_id;
    }
    public User() {
    }
}

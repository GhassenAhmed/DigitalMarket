package org.dsi.service;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.dsi.entity.InfoUser;
import org.dsi.payload.UserInfo;
import org.dsi.repo.NodeSync;
import org.dsi.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import net.minidev.json.JSONObject;

@Service
public class UserInfoService {
	
	@Autowired
	UserRepo userRepo;
	
	@Autowired
	NodeSync nodeSync;
	
	
	
	public InfoUser getInfoUserByEmail(String email) throws Exception {
	    InfoUser user = userRepo.getUserByemail(email);
	    if (user == null) {
	        throw new Exception("User not found for email: " + email);
	    }
	    return user;
	}
	
	
	public InfoUser getInfoUserById(Long id) throws Exception {
	    InfoUser user = userRepo.getUserById(id);
	    if (user == null) {
	        throw new Exception("User not found for id: " + id);
	    }
	    return user;
	}
	
	public void addInfoUser(UserInfo user) throws Exception {
		
		
	    InfoUser newuser = new   InfoUser();
	    Map<String, Object> roleData = new HashMap<>();
        roleData.put("roles", user.getRoles());

	    try {
	    	if(userRepo.getUserByemail(user.getEmail())==null) {
	    		//FileUpload.saveFile(uploadDir, fileName, file);
				newuser.setFirstName(user.getFirstName());
				newuser.setLastName(user.getLastName());
				if(user.getCin()!=null) {
					newuser.setCin(user.getCin());
				}
				newuser.setEmail(user.getEmail());
				newuser.setPassword(user.getPassword());
				newuser.setNumTlf(user.getNumTlf());
				newuser.setPhoto(null);
				newuser.setSexe(user.getSexe());
				newuser.setPhotoCin(user.getPhotoCin());
				newuser.setRoles(user.getRoles());
				userRepo.save(newuser);
				JSONObject jsoUser=new JSONObject();
	  			jsoUser.appendField("Name",user.getFirstName());
	  			jsoUser.appendField("LastName",user.getLastName());
	  			jsoUser.appendField("email",user.getEmail());
	  			if(user.getCin()!=null) {
	  				jsoUser.appendField("cin",user.getCin());
				}
	  			jsoUser.appendField("status",0);
	  			jsoUser.appendField("Photo",null);
	  			jsoUser.appendField("roles",roleData);
	  			nodeSync.addInfoUser(jsoUser);
	    	}else {
	    		throw new Exception("User with email " + user.getEmail() + " already exists.");
	    	}
		} catch (IllegalStateException | IOException e) {
			e.printStackTrace();
		}	
	}
}

/**
 * 
 */
package com.pos.controller;

import com.pos.domain.Company;
import com.pos.domain.Company2;
import com.pos.domain.CompanyDTO;
import com.pos.domain.UIResponse;
import com.pos.domain.User;
import com.pos.repositories.CompanyRepository;
import com.pos.repositories.UserRepository;

import java.io.File;
import java.io.IOException;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.DiskFileUpload;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUpload;
import org.apache.commons.fileupload.FileUploadException;
import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.ModelAndView;


/**
 * @author swaminathana
 *
 */
@Controller
@RequestMapping("/home")
public class HomeController {

	public static Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	
	@Autowired
    private UserRepository userRepository;
	
	
	@Autowired
    private CompanyRepository companyRepository;
	
	/**
	 * @param request request
	 * @param response response
	 * @return ModelAndView ModelAndView
	 * @throws Exception 
	 */
	@RequestMapping("/login")
	public ModelAndView helloWorld(HttpServletRequest request, HttpServletResponse response) throws IOException {
		logger.debug("Entering helloWorld");
		ModelAndView model = new ModelAndView(".home");
		
		return model;
	}
	@RequestMapping(value="/upload")
    public ModelAndView upload(HttpServletResponse response) throws IOException{        
        
        return new ModelAndView(".upload");
    }
    
	@RequestMapping(value="/email")
    public ModelAndView email(HttpServletResponse response) throws Exception{        
	    try {
            // Generate exception
            throw new Exception("Generating exception to test Log4j mail notification...");
        } catch (Exception ex) {
            logger.error("Test Result : ", ex);
        }
	    return null;
    }
	
    @RequestMapping(value="/importFile", method = RequestMethod.POST)
    public ModelAndView importFile(HttpServletRequest request, HttpServletResponse response) throws Exception {
        
        //response.setContentType("text/json;charset=UTF-8");
        
        
        try {
            // first check if the upload request coming in is a multipart request
            boolean isMultipart = FileUpload.isMultipartContent(request);
            logger.debug("content-length: " + request.getContentLength());
            logger.debug("method: " + request.getMethod());
            logger.debug("character encoding: " + request.getCharacterEncoding());
 
            if (isMultipart) {
                DiskFileUpload upload = new DiskFileUpload();
                List items = null;
 
                try {
                    // parse this request by the handler
                    // this gives us a list of items from the request
                    items = upload.parseRequest(request);
                    logger.debug("items: " + items.toString());
                } catch (FileUploadException ex) {
                    logger.debug("Failed to parse request", ex);
                }
                Iterator itr = items.iterator();
 
                while (itr.hasNext()) {
                    FileItem item = (FileItem) itr.next();
 
                    // check if the current item is a form field or an uploaded file
                    if (item.isFormField()) {
 
                        // get the name of the field
                        String fieldName = item.getFieldName();
                    } else {
 
                        // the item must be an uploaded file save it to disk. Note that there
                        // seems to be a bug in item.getName() as it returns the full path on
                        // the client's machine for the uploaded file name, instead of the file
                        // name only. To overcome that, I have used a workaround using
                        // fullFile.getName().
                        File fullFile = new File(item.getName());
                        File savedFile = new File("E:/uploads/", fullFile.getName());
                        try {
                            item.write(savedFile);
                        } catch (Exception ex) {
                            logger.debug("Failed to save file", ex);
                        }
                    }
                }
 
            }
        } finally {
            response.getWriter().write("{\"success\":\"true\"}");
        }
        return null;
    }

    @RequestMapping(value="/getData")
    public ModelAndView getData(HttpServletResponse response) throws IOException{
    
     
        long id = 101;
        String userName = "test";
        //User user = repository.findById(id);
        List<User> userList = userRepository.findAll();
        UIResponse uiResponse = new UIResponse();
        uiResponse.setList(userList);
        //User user = repository.findByUserName(userName);
        ObjectMapper mapper = new ObjectMapper();
        response.setContentType("text/javascript");
        response.getWriter().write(mapper.writeValueAsString(uiResponse));
        return null;
    }
    
    @RequestMapping(value="/getGridData", method = { RequestMethod.GET}, produces = "application/json")
    @ResponseStatus(org.springframework.http.HttpStatus.OK)
    @ResponseBody
    public UIResponse getGridData(
    		/*@RequestBody Company company,*/
    	    javax.servlet.http.HttpServletRequest request,
    	    javax.servlet.http.HttpServletResponse response) throws IOException{     
        List<Company> userList = companyRepository.findAll();
        UIResponse uiResponse = new UIResponse();
        uiResponse.setSuccess(true);
        uiResponse.setList(userList);
        return uiResponse;
    }
    
    @RequestMapping(value="/getGridDataUpdate", method = { RequestMethod.POST }, headers = {"Content-type=application/json"}, consumes = "application/json")
    @ResponseStatus(org.springframework.http.HttpStatus.OK)
    @ResponseBody
    public UIResponse getGridDataUpdate(
    		/*@PathVariable("transId") Integer transId,*/
    		@RequestBody CompanyDTO records,
    	    javax.servlet.http.HttpServletRequest request,
    	    javax.servlet.http.HttpServletResponse response) throws IOException{     
        List<Company> userList = companyRepository.findAll();
        UIResponse uiResponse = new UIResponse();
        //uiResponse.setList(userList);
        return uiResponse;
    }
    
    @RequestMapping(value="/getGridDetailData", method = { RequestMethod.POST }, headers = {"Content-type=application/json"}, consumes = "application/json")
    @ResponseStatus(org.springframework.http.HttpStatus.OK)
    @ResponseBody
    public UIResponse getGridDetailData(
    		@RequestBody Company2 company,
    	    javax.servlet.http.HttpServletRequest request,
    	    javax.servlet.http.HttpServletResponse response) throws IOException{     
        List<Company> userList = companyRepository.findAll();
        UIResponse uiResponse = new UIResponse();
        uiResponse.setSuccess(true);
        //uiResponse.setList(userList);
        return uiResponse;
    }
    
}

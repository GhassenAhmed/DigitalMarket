package org.dsi.controller;

import java.util.List;
import java.util.Optional;

import org.dsi.entity.Category;
import org.dsi.repository.CategoryRepo;
import org.dsi.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

@RestController
@RequestMapping("/categories")
public class CategoryController {

	@Autowired
	CategoryService ServiceCat;
	
	@Autowired
	CategoryRepo cateRepo;
	

	@PostMapping("/AddCat")
	public ResponseEntity<?> AddCategory(@RequestBody Category cat){
		try {
			ServiceCat.AddCategory(cat);
			
			return ResponseEntity.ok("Category Added");
		}catch (Exception e) {
			return new ResponseEntity<String>(e.getMessage(),HttpStatus.FOUND);
		}
	}
	
	@GetMapping("/getCatg")
	public List<Category> getCat() {
		return cateRepo.findAll();
	}

	@GetMapping("/GetCategoryById")
	public ResponseEntity<?> GetCategoryById(@RequestParam("id") long id) {
		try {
			Optional<Category> category = cateRepo.findById(id);
			if (category.isPresent()) {
				return new ResponseEntity<>(category, HttpStatus.OK);
			} else {
				return ResponseEntity.ok("Category not found");
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/getAll")
	public ResponseEntity<?> getAll(@RequestParam(name="search",defaultValue="") String name){

		try {

			if(name.isEmpty()==true) {

				return ResponseEntity.ok(cateRepo.getAllCategory());

			}else if (cateRepo.getCategorySearchName(name)!=null) {

				return ResponseEntity.ok(cateRepo.getCategorySearchName(name));

			}else {

				return ResponseEntity.ok("Category Not Found , please try again ");
			}

		}catch(DataAccessException e) {

			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while accessing the database.");
		}catch(Exception e) {

			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while fetching  category.");
		}


	}


	@PostMapping("/updateCategorie")
	public ResponseEntity<?> updateCategorie(@RequestParam("id") Long id, @RequestBody Category newCategory) {

		try {

			Category updatedCategory = cateRepo.findCategoryById(id);

			if (updatedCategory == null) {

				return ResponseEntity.ok("This category is not available , please check again ");

			} else {

				updatedCategory.setNom(newCategory.getNom());
				cateRepo.save(updatedCategory);
				return ResponseEntity.ok("Category  updated successfuly ");

			}
		} catch (HttpClientErrorException.NotFound e) {

			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());

		} catch (Exception e) {

			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
		}

	}


	@DeleteMapping("/DeleteCategoryById")
	public ResponseEntity<?> DeleteProductById(@RequestParam("id") long id){
		Category category = cateRepo.findCategoryById(id);
		try {
			if(category == null) {
				String message = "This category is not available , please check again";
				return ResponseEntity.ok(message);
			}else {
				cateRepo.delete(category);
				return ResponseEntity.ok("category deleted successfully");
			}
		}catch(Exception e) {

			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while deleting the category.");
		}
	}

}

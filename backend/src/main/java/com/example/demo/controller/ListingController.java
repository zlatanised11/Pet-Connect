package com.example.demo.controller;

import com.example.demo.model.Listing;
import com.example.demo.model.ListingStatus;
import com.example.demo.service.ListingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/listings")
@CrossOrigin(origins = "http://localhost:3000")
public class ListingController {

    @Autowired
    private ListingService service;

    public static class ListingSummary { // Inner Class
        public String id;
        public String title;
        public String status;

        public ListingSummary(String id, String title, String status) {
            this.id = id;
            this.title = title;
            this.status = status;
        }
    }

    @PostMapping("/add")
    public Listing addListing(@RequestBody Listing listing) {
        return service.addListing(listing);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteListing(@PathVariable String id) {
        try {
            service.deleteListing(id);
            return ResponseEntity.ok("Listing deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to delete due to internal error.");
        }
    }



    @GetMapping
    public List<Listing> getAll() {
        return service.getAll();
    }

    @GetMapping("/user/{username}")
    public List<Listing> getUserListings(@PathVariable String username) {
        return service.getUserListings(username);
    }

    @PostMapping("/request/{id}")
    public Listing requestItem(@PathVariable String id, @RequestParam String user) {
        return service.requestItem(id, user);
    }

    @GetMapping("/requests")
    public List<Listing> getRequests() {
        return service.getRequests();
    }

    @PostMapping("/approve/{id}")
    public Listing approve(@PathVariable String id) {
        return service.approveRequest(id);
    }

    @PostMapping("/deny/{id}")
    public Listing deny(@PathVariable String id) {
        return service.denyRequest(id);
    }

    @GetMapping("/sorted")
    public List<Listing> getSortedListings() {
        return service.getSortedListings();
    }

    @GetMapping("/grouped-by-status")
    public Map<ListingStatus, List<Listing>> getGroupedByStatus() {
        return service.groupByStatus();
    }

    @GetMapping("/summary")
    public List<ListingSummary> getSummary() {
        return service.getAll().stream()
                .map(listing -> new ListingSummary(listing.getId(), listing.getTitle(), listing.getStatus().toString()))
                .toList();
    }
}

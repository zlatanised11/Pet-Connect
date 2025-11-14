package com.example.demo.service;

import com.example.demo.model.Listing;
import com.example.demo.model.ListingStatus;
import com.example.demo.repository.ListingRepository;
import com.example.demo.util.ListingCSVLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ListingService {

    @Autowired
    private ListingRepository listingRepo;

    public Listing addListing(Listing listing) {
        listing.setRequested(false);
        listing.setRequestedBy(null);
        listing.setStatus(ListingStatus.AVAILABLE);
        Listing saved = listingRepo.save(listing);
        ListingCSVLogger.logAction("ADD", saved);
        return saved;
    }

    public void deleteListing(String id) {
        Listing listing = listingRepo.findById(id).orElse(null);
        if (listing != null) {
            try {
                ListingCSVLogger.logAction("DELETE", listing); 
            } catch (Exception e) {
                System.err.println("CSV logging failed: " + e.getMessage());
            }
            listingRepo.deleteById(id);
        }
    }



    public List<Listing> getAll() {
        return listingRepo.findAll();
    }

    public List<Listing> getUserListings(String username) {
        return listingRepo.findAll().stream()
                .filter(listing ->
                        !listing.isRequested() ||
                        username.equalsIgnoreCase(listing.getRequestedBy()) ||
                        listing.getStatus() == ListingStatus.AVAILABLE 
                )
                .collect(Collectors.toList());
    }



    public Listing requestItem(String id, String user) {
        Listing listing = listingRepo.findById(id).orElse(null);
        if (listing != null && !listing.isRequested()) {
            listing.setRequested(true);
            listing.setRequestedBy(user);
            listing.setStatus(ListingStatus.PENDING);
            return listingRepo.save(listing);
        }
        return null;
    }

    public List<Listing> getRequests() {
        return listingRepo.findAll().stream()
                .filter(Listing::isRequested)
                .collect(Collectors.toList());
    }

    public Listing approveRequest(String id) {
        Listing listing = listingRepo.findById(id).orElse(null);
        if (listing != null) {
            listing.setStatus(ListingStatus.APPROVED);
            Listing approved = listingRepo.save(listing);
            ListingCSVLogger.logAction("APPROVE", approved);
            return approved;
        }
        return null;
    }

    public Listing denyRequest(String id) {
        Listing listing = listingRepo.findById(id).orElse(null);
        if (listing != null) {
            listing.setDeniedForUser(listing.getRequestedBy()); // track who was denied
            listing.setRequested(false);
            listing.setRequestedBy(null);
            listing.setStatus(ListingStatus.AVAILABLE);

            Listing denied = listingRepo.save(listing);
            ListingCSVLogger.logAction("DENY", denied);
            return denied;
        }
        return null;
    }




    public List<Listing> getSortedListings() {
        List<Listing> listings = listingRepo.findAll();
        listings.sort((a, b) -> a.getTitle().compareToIgnoreCase(b.getTitle()));
        return listings;
    }

    public Map<ListingStatus, List<Listing>> groupByStatus() {
        return listingRepo.findAll().stream()
                .collect(Collectors.groupingBy(Listing::getStatus));
    }
}

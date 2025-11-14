package com.example.demo.model;

import com.example.demo.util.Exportable;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "listings")
public class Listing extends BaseEntity implements Exportable {

    private String title;
    private String description;
    private boolean requested;
    private String requestedBy;
    private ListingStatus status;
    private String image;
    private String deniedForUser;

    public String getDeniedForUser() {
        return deniedForUser;
    }

    public void setDeniedForUser(String deniedForUser) {
        this.deniedForUser = deniedForUser;
    }


    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public boolean isRequested() { return requested; }
    public void setRequested(boolean requested) { this.requested = requested; }

    public String getRequestedBy() { return requestedBy; }
    public void setRequestedBy(String requestedBy) { this.requestedBy = requestedBy; }

    public ListingStatus getStatus() { return status; }
    public void setStatus(ListingStatus status) { this.status = status; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    @Override
    public String toCSVRow() {
        return String.format("\"%s\",\"%s\",\"%s\",%b,\"%s\",\"%s\",\"%s\",\"%s\"",
                getId(),
                escape(title),
                escape(description),
                requested,
                requestedBy,
                status,
                getCreatedAt(),
                getUpdatedAt()
        );
    }


    private String escape(String input) {
        return input != null ? input.replace("\"", "\"\"") : "";
    }
}

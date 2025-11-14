package com.example.demo.util;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDateTime;

public class ListingCSVLogger {

    private static final String FILE_PATH = "logs/listings_log.csv";
    private static final String HEADER =
    	    "timestamp,action,id,title,description,requested,requestedBy,status,createdAt,updatedAt\n";



    public static void logAction(String action, Exportable entity) {
        try {
            File logDir = new File("logs");
            if (!logDir.exists()) {
                logDir.mkdirs();
            } 

            File file = new File(FILE_PATH);
            boolean isNewFile = file.createNewFile();

            FileWriter writer = new FileWriter(file, true);
            if (isNewFile) writer.write(HEADER);

            writer.write(LocalDateTime.now() + "," + action + "," + entity.toCSVRow() + "\n");
            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

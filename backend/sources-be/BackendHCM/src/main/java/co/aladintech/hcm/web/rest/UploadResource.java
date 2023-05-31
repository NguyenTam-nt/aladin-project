package co.aladintech.hcm.web.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/api")
public class UploadResource {
    private final Logger log = LoggerFactory.getLogger(UploadResource.class);
    public static String UPLOAD_IMAGE = System.getProperty("user.dir") + "/uploads/images/";
    public static String UPLOAD_VIDEO = System.getProperty("user.dir") + "/uploads/videos/";
    @Value("${urlImage}")
    private String linkImage;
    @Value("${urlVideo}")
    private String linkVideo;
    @PostMapping("/image")
    public String create( @RequestParam("file") MultipartFile imageInput) throws IOException {
        if(!Files.exists(Paths.get(UPLOAD_IMAGE))){
            Files.createDirectories(Paths.get(UPLOAD_IMAGE));
        }
        System.out.println(imageInput.getContentType());
        if ((!imageInput.getContentType().equals("image/png")) && (!imageInput.getContentType().equals("image/jpeg"))) {
            return "Not Png or jpg";
        }
        BufferedImage image = ImageIO.read(imageInput.getInputStream());
        String name = String.valueOf(System.currentTimeMillis());
        ImageIO.write(image, "webp", new File(UPLOAD_IMAGE+name));
        return linkImage+name;
    }


    @PostMapping("/video")
    public String createVideo( @RequestParam("file") MultipartFile video) throws IOException {
        if(!Files.exists(Paths.get(UPLOAD_VIDEO))){
            Files.createDirectories(Paths.get(UPLOAD_VIDEO));
        }
        System.out.println(video.getContentType());
        if (!video.getContentType().equals("video/mp4")) {
            return "Not mp4";
        }
        String name = String.valueOf(System.currentTimeMillis());
        FileOutputStream output = new FileOutputStream(UPLOAD_VIDEO+name);
        output.write(video.getBytes());
        return linkVideo+name;
    }

    @PostMapping("/images")
    public List<String> createlist(@RequestParam("file") MultipartFile[] imageInputs) throws IOException {
        if(!Files.exists(Paths.get(UPLOAD_IMAGE))){
            Files.createDirectories(Paths.get(UPLOAD_IMAGE));
        }
        List<String> result = new ArrayList<>();
        for (MultipartFile file : imageInputs){
            if ((!file.getContentType().equals("image/png")) && (!file.getContentType().equals("image/jpeg"))) {
                log.error("Not Png or jpg");
            } else {
                BufferedImage image = ImageIO.read(file.getInputStream());
                String name = String.valueOf(System.currentTimeMillis());
                ImageIO.write(image, "webp", new File(UPLOAD_IMAGE+name));
                result.add(linkImage+name);
            }
        }
        return result;
    }

    @GetMapping("/image/{name}")
    public Object getImage(@PathVariable String name) throws FileNotFoundException {
        log.debug("REST request to get Image : {}", name);
        InputStream targetStream = new FileInputStream(UPLOAD_IMAGE+ name);
        InputStreamResource resource = new InputStreamResource(targetStream);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=" + "image.webp")
                .contentType(MediaType.parseMediaType("image/webp"))
                .body(resource);
    }

    @GetMapping("/video/{name}")
    public ResponseEntity<StreamingResponseBody> streamFile(@PathVariable String name) {

        File file = new File(UPLOAD_VIDEO+name);
        if (!file.isFile()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);

        }

        StreamingResponseBody stream = out -> {

            try {
                final InputStream inputStream = new FileInputStream(file);

                byte[] bytes = new byte[1024];
                int length;
                while ((length = inputStream.read(bytes)) >= 0) {
                    out.write(bytes, 0, length);
                }
                inputStream.close();
                out.flush();

            } catch (final Exception e) {
            }

        };

        final HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "video/mp4");
        headers.add("Content-Length", Long.toString(file.length()));
        return ResponseEntity.ok().headers(headers).body(stream);
    }

    @PostMapping("/files-upload")
    public List<String> uploads(@RequestBody MultipartFile[] files, Principal principal) throws Exception {
        List<String> urls = new ArrayList<>();
        for (MultipartFile file : files) {
            urls.add(uploadFile(file, file.getOriginalFilename()));
        }
        return urls;
    }

    public String uploadFile(MultipartFile multipartFile, String name) {
        try {
            Path root = Paths.get("/uploads/files/");
            Path resolve = root.resolve(name);
            Files.createDirectories(root);
            Files.copy(multipartFile.getInputStream(), resolve);
            log.info("dang up file image");
        } catch (Exception e) {
            log.error("Error");
        }
        return "/uploads/files/" + name;
    }
}

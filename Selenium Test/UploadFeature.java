package SoftCon;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;;

public class UploadFeature {
    public static void main(String[] args) throws InterruptedException {


        System.setProperty("webdriver.chrome.driver","D:\\Programs\\chromedriver.exe");

        WebDriver driver = new ChromeDriver();
        driver.get("http://localhost:3000/home");
        Thread.sleep(4000);

        WebElement button=driver.findElement(By.id("uploadNav"));
        button.click();
        Thread.sleep(4000);

        WebElement uploadElement = driver.findElement(By.className("csv-input"));
        uploadElement.sendKeys("D:\\Projects\\react\\space-allocation\\refinedcsv.csv");
        Thread.sleep(4000);

        WebElement uploadButton = driver.findElement(By.id("uploadBtn"));
        uploadButton.click();
    }
}

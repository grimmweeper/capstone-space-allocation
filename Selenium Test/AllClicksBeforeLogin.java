package SoftCon;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class AllClicksBeforeLogin {

    public static void main(String[] args) throws InterruptedException {

        //System.setProperty("webdriver.chrome.driver","D:\\Programs\\chromedriver.exe");
        System.setProperty("webdriver.chrome.driver","C:\\Code\\web_drivers\\chromedriver.exe");

        WebDriver driver = new ChromeDriver();
        driver.get("http://localhost:3000");
        Thread.sleep(2000);

        // Click on sidebar elements
        WebElement homeButton = driver.findElement(By.name("homePage"));
        homeButton.click();
        Thread.sleep(2000);

        WebElement mapButton = driver.findElement(By.name("mapPage"));
        mapButton.click();
        Thread.sleep(2000);

        WebElement uploadButton = driver.findElement(By.name("uploadPage"));
        uploadButton.click();
        Thread.sleep(2000);

        WebElement allocateButton = driver.findElement(By.name("allocatePage"));
        allocateButton.click();
        Thread.sleep(2000);

        WebElement clearButton = driver.findElement(By.name("clearPage"));
        clearButton.click();
        Thread.sleep(2000);

        WebElement saveButton = driver.findElement(By.name("savePage"));
        saveButton.click();
        Thread.sleep(2000);

        WebElement logoutButton = driver.findElement(By.name("logoutPage"));
        logoutButton.click();
        Thread.sleep(2000);

        // Click on login page buttons
        WebElement loginButton = driver.findElement(By.name("login"));
        loginButton.click();
        Thread.sleep(2000);

        WebElement registerButton = driver.findElement(By.name("register"));
        Thread.sleep(2000);
        registerButton.click();

    }
}

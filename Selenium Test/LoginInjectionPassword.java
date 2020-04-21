package SoftCon;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class LoginInjectionPassword {

    static String validUsername = "liying";
    static String passwordInjection = "' OR '0'='0";

    public static void main(String[] args) throws InterruptedException {

        //System.setProperty("webdriver.chrome.driver","D:\\Programs\\chromedriver.exe");
        System.setProperty("webdriver.chrome.driver","C:\\Code\\web_drivers\\chromedriver.exe");

        WebDriver driver = new ChromeDriver();
        driver.get("http://localhost:3000");
        Thread.sleep(2000);

        // Login with valid username and any password
        WebElement usernameField = driver.findElement(By.name("username"));
        Thread.sleep(2000);
        usernameField.sendKeys(validUsername);

        WebElement passwordField = driver.findElement(By.name("password"));
        Thread.sleep(2000);
        passwordField.sendKeys(passwordInjection);

        WebElement loginButton = driver.findElement(By.name("login"));
        loginButton.click();
        Thread.sleep(2000);
    }

}

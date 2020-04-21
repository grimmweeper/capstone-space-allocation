package SoftCon;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;

public class SignupInvalidUsername {

    static String username = "tom";
    static String password = "abcdef";
    static String email = "tom@gmail.com";
    static String type = "user";

    public static void main(String[] args) throws InterruptedException {

        //System.setProperty("webdriver.chrome.driver","D:\\Programs\\chromedriver.exe");
        System.setProperty("webdriver.chrome.driver","C:\\Code\\web_drivers\\chromedriver.exe");

        WebDriver driver = new ChromeDriver();
        driver.get("http://localhost:3000/signup");
        Thread.sleep(2000);

        for (int i = 0; i < 2; i++) {

            WebElement registerButton1 = driver.findElement(By.name("register"));
            Thread.sleep(2000);
            registerButton1.click();

            WebElement usernameField = driver.findElement(By.name("username"));
            Thread.sleep(2000);
            usernameField.sendKeys(username);

            WebElement passwordField = driver.findElement(By.name("password"));
            Thread.sleep(2000);
            passwordField.sendKeys(password);

            WebElement emailField = driver.findElement(By.name("email"));
            Thread.sleep(2000);
            emailField.sendKeys(email);

            Select typeField = new Select(driver.findElement(By.name("type")));
            Thread.sleep(2000);
            typeField.selectByValue(type);

            WebElement registerButton2 = driver.findElement(By.name("register"));
            registerButton2.click();
            Thread.sleep(2000);

            // Click ok on the alert message
            driver.switchTo().alert().accept();
            Thread.sleep(2000);

        }
    }
}

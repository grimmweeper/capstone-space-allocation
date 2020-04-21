package SoftCon;

import org.openqa.selenium.By;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class TestAllLink {
    public static void main(String[] args) throws InterruptedException {

        //System.setProperty("webdriver.chrome.driver", "D:\\Programs\\chromedriver.exe");
        System.setProperty("webdriver.chrome.driver","/C:/Code/web_drivers/chromedriver.exe");

        WebDriver driver = new ChromeDriver();
        driver.get("http://localhost:3000/home");

        // get all the links
        java.util.List<WebElement> links = driver.findElements(By.tagName("a"));
        System.out.println(links.size());

        System.out.println("***Printing all link names***");
        // print all the links
        for (int i = 0; i < links.size(); i = i + 1) {
            System.out.println(i + " " + links.get(i).getText());
        }
        System.out.println("***Printing all link addresses***");
        // print all the hyper links
        for (int i = 0; i < links.size(); i = i + 1) {
            System.out.println(i + " " + links.get(i).getAttribute("href"));
        }

        for (int i = 0; i < links.size(); i++) {
            System.out.println("*** Navigating to" + " " + links.get(i).getAttribute("href"));
            //if (links.get(i).getAttribute("href") == null ||
            //		links.get(i).getAttribute("href").equals("https://sudiptac.bitbucket.io"))
            if (links.get(i).getAttribute("href") == null)
                continue;
//            Thread.sleep(3000);
//            driver.navigate().to(links.get(i).getAttribute("href"));
//            Thread.sleep(3000);
//            links = driver.findElements(By.tagName("a"));
            //click the back button in browser
            boolean staleElementLoaded = true;
            //the loop checks whether the elements is properly loaded
            while (staleElementLoaded) {
                try {
                    //navigate to the link
                    driver.get(links.get(i).getAttribute("href"));
                    Thread.sleep(3000);
                    links = driver.findElements(By.tagName("a"));
                    staleElementLoaded = false;
                } catch (StaleElementReferenceException e) {
                    staleElementLoaded = true;
                }
            }
        }
        System.out.println("Test finished");
    }
}


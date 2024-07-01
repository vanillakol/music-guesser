import pyautogui as p
import time
import pyperclip
import random
import requests
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains

links =['https://www.instagram.com/saycheesetv/', 'https://www.instagram.com/akademiks/', 'https://www.instagram.com/theshaderoom/' ]
comments_to_choose_from = ['who needs 100k streams?', 'who wants 50k followers?', 'who needs 50k+ spotify streams?', 'who needs 100k+ youtube views?', ]
ak_prev = ''
sc_prev = ''
sr_prev = ''

api_key = 'f1b8dc76a3a16222ffcc32755fd82f07'
api_url = 'https://justanotherpanel.com/api/v2'


def continue_comment():
    print('we are now continuing')
    
    #comment box
    p.moveTo(x=1393, y=953, duration=1)
    p.click()
    print('clicked comment box')
    time.sleep(2)
    p.write(random.choice(comments_to_choose_from))
    time.sleep(2)
    #post button
    post = driver.find_element(By.XPATH, "//div[contains(text(), 'Post')]")
    post.click()
    print('posted comment')
    time.sleep(3)
    link_to_comments = driver.find_elements(By.XPATH, '//time[@class="_a9ze _a9zf"]')
    link_to_comment = link_to_comments[1]
    actions = ActionChains(driver)
    actions.context_click(link_to_comment).perform()
    time.sleep(2)
    p.press('down')
    p.press('down')
    p.press('down')
    p.press('down')
    p.press('down')
    p.press('down')
    p.press('enter')
    link_to_bot = pyperclip.paste()
    print(link_to_bot)
    response = requests.post(api_url, {'key': api_key, 'action': 'add', 'service': 894, 'link': link_to_bot, "quantity": 20})
    print(response)
    time.sleep(5)


while True:
    
    # Set up the Selenium WebDriver
    driver = webdriver.Edge()
    driver.maximize_window()  # Maximize the browser window

    # or use Firefox(), Edge(), etc. Ensure you have the correct driver installed

    driver.get("https://www.instagram.com")

    time.sleep(5) 

    username = driver.find_element(By.XPATH, "//input[@aria-label='Phone number, username, or email']")
    username.send_keys('thesmmglow')

    password = driver.find_element(By.XPATH, "//input[@aria-label='Password']")
    password.send_keys('ezekiel16')


    p.moveTo(x=1175, y=503, duration=1)
    p.click()

    # Close the browser after a delay
    time.sleep(10)

    for link in links:
        p.moveTo(x=539, y=63)
        p.click()
        p.write(link)
        p.press('enter')
        time.sleep(10)
        posts = driver.find_elements(By.XPATH, "//div[@class='_aagw']")
        latest_posts = posts[0]
        latest_posts.click()
        time.sleep(10)
        p.moveTo(x=539, y=63)
        p.click()
        p.hotkey('ctrl', 'c')
        latest_post = pyperclip.paste()
        if 'ak' in link:
            if latest_posts != ak_prev:
                continue_comment()
                ak_prev = latest_post

        if 'say' in link:
            if latest_posts != ak_prev:
                continue_comment()
                sc_prev = latest_post
            
        if 'shade' in link:
            if latest_posts != ak_prev:
                continue_comment()
                sr_prev = latest_post
                
    driver.quit()
    print('sleeping for 30min')
    time.sleep(1800)

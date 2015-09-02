Feature: Comments
  As a Blog manager
  I want to allow people to rate the posts on the blog
  In order that they interact a little bit

  Background:
    Given the following authors exist:
      | name             |
      | someone          |
      | over             |
      | rainbow          |
    
    And the following posts exist:
      | title     | content      | author  |
      | way       | up high      | someone |
      | land      | I heard of   | over    |
      | once      | In a lullaby | rainbow |
    

  Scenario: No ratings on a post page
    Given I visit the page for the post with title "once"
    Then I should see a message saying there are no ratings

  Scenario: Rate a post
    Given I visit the page for the post with title "way"
    When  I give the post a rating of "5"
    And   I give the post a rating of "3"
    Then  I should see that the post has a rating of "4"
  
  Scenario: Order at posts list
    Given I visit the posts list page
    And   Post with title "rainbow" has a mean rating of "4"
    And   Post with title "over" has a mean rating of "3"
    Then  Posts should be ordered by date
    And   I choose "order by rating"
    Then  Post with title "rainbow" is before post with title "over"

require "application_system_test_case"

class ApplicantsTest < ApplicationSystemTestCase
  setup do
    @applicant = applicants(:one)
  end

  test "visiting the index" do
    visit applicants_url
    assert_selector "h1", text: "Applicants"
  end

  test "should create Applicant" do
    visit applicants_url
    click_on "New Applicant"

    fill_in "Name", with: @applicant.name, match: :first
    click_on "Create Applicant"

    assert_text "Applicant was successfully created"
    click_on "Back"
  end

  test "should update Applicant" do
    visit applicants_url
    click_on "Edit", match: :first

    fill_in "Name", with: @applicant.name, match: :first
    click_on "Update Applicant"

    assert_text "Applicant was successfully updated"
    click_on "Back"
  end

  test "should destroy Applicant" do
    visit applicants_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Applicant was successfully destroyed"
  end

  test "accepts nested attributes for Personal References when creating" do
    visit new_applicant_path

    fill_in "Name", with: "New Applicant", match: :first
    within "fieldset", text: "Personal Reference" do
      fill_in "Name", with: "Friend"
      fill_in "Email address", with: "friend@example.com"
    end
    click_on "Create Applicant"

    assert_text "Applicant was successfully created"
    assert_text "friend@example.com"
  end
end

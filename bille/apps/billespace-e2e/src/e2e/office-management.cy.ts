const get = (name: string) => cy.get(`[data-cy="${name}"]`);

it('creates office', () => {
  cy.visit('/office-management');

  cy.get('[placeholder="Country*"]').click();
  get('country').first().click();
  cy.get('[placeholder="City*"]').click();
  get('city').first().click();
  get('address-input').type('Pileckiego 6');
  get('post-code-input').type('55521');
  get('confirm-button').click();

  get('add-item-input').type('A');
  get('add-item-button').click();
  get('confirm-button').click();

  get('range-input').first().invoke('val', 41).trigger('change');
  get('confirm-button').click();

  get('add-item-input').type('1');
  get('add-item-button').click();
  get('confirm-button').click();

  get('range-input').first().invoke('val', 41).trigger('change');
  get('confirm-button').click();

  get('confirm-button').click();

  cy.contains('Office created!');
});

it('edits office', () => {
  cy.visit('/office-management?officeId=1');

  get('confirm-button').click();

  get('confirm-button').click();

  get('confirm-button').click();

  get('confirm-button').click();

  get('confirm-button').click();

  get('confirm-button').click();

  cy.contains('Edit done!');
});

import { VersionAngular2Page } from './app.po';

describe('version-angular2 App', function() {
  let page: VersionAngular2Page;

  beforeEach(() => {
    page = new VersionAngular2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

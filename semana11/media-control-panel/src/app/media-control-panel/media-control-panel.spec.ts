import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaControlPanel } from './media-control-panel';

describe('MediaControlPanel', () => {
  let component: MediaControlPanel;
  let fixture: ComponentFixture<MediaControlPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaControlPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaControlPanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

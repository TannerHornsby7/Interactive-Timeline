interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  important: boolean;
}

export class Timeline {
  private container: HTMLElement;
  private events: Event[];
  private timelineEl: HTMLElement;
  private detailsEl: HTMLElement;

  constructor(container: HTMLElement, events: Event[]) {
    this.container = container;
    this.events = events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    this.render();
  }

  private render() {
    this.container.innerHTML = `
      <div class="timeline-container">
        <div class="timeline-details"></div>
        <div class="timeline-events"></div>
      </div>
    `;
    this.timelineEl = this.container.querySelector('.timeline-events') as HTMLElement;
    this.detailsEl = this.container.querySelector('.timeline-details') as HTMLElement;

    this.renderEvents();
    this.renderDetails(this.events[0]);
  }

  private renderEvents() {
    const minDate = new Date(Math.min(...this.events.map(e => new Date(e.date).getTime())));
    const maxDate = new Date(Math.max(...this.events.map(e => new Date(e.date).getTime())));
    const totalDays = (maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24);

    const groupedEvents = this.events.reduce((acc, event) => {
      const year = new Date(event.date).getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(event);
      return acc;
    }, {} as Record<number, Event[]>);

    Object.entries(groupedEvents).forEach(([year, yearEvents]) => {
      const position = this.getEventPosition(yearEvents[0].date, minDate, totalDays);
      const eventGroup = document.createElement('div');
      eventGroup.className = 'timeline-event-group';
      eventGroup.style.left = `${position}%`;

      yearEvents.forEach((event, index) => {
        const eventEl = document.createElement('div');
        eventEl.className = `timeline-event ${event.important ? 'important' : ''} ${index === 0 ? 'visible' : ''}`;
        eventEl.setAttribute('data-id', event.id);
        eventEl.addEventListener('click', () => this.handleEventClick(event));
        eventEl.addEventListener('mouseenter', () => this.handleEventHover(event));
        eventEl.addEventListener('mouseleave', () => this.handleEventLeave());
        eventGroup.appendChild(eventEl);
      });

      eventGroup.addEventListener('mouseenter', () => this.expandEventGroup(eventGroup));
      eventGroup.addEventListener('mouseleave', () => this.collapseEventGroup(eventGroup));

      this.timelineEl.appendChild(eventGroup);
    });
  }

  private renderDetails(event: Event) {
    this.detailsEl.innerHTML = `
      <h2>${event.title}</h2>
      <p class="date">${new Date(event.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      <p>${event.description}</p>
    `;
  }

  private getEventPosition(date: string, minDate: Date, totalDays: number): number {
    const eventDate = new Date(date);
    const daysSinceStart = (eventDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24);
    return (daysSinceStart / totalDays) * 100;
  }

  private handleEventClick(event: Event) {
    this.renderDetails(event);
  }

  private handleEventHover(event: Event) {
    this.renderDetails(event);
  }

  private handleEventLeave() {
    // Optionally reset to default event or do nothing
  }

  private expandEventGroup(eventGroup: HTMLElement) {
    eventGroup.classList.add('expanded');
  }

  private collapseEventGroup(eventGroup: HTMLElement) {
    eventGroup.classList.remove('expanded');
  }
}


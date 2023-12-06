export function combineDaysAndGroups(fetchedDays, fetchedGroups) {
  if (fetchedDays && fetchedGroups) {
    const groups = fetchedGroups.map((group) => {
      return {
        id: group._id,
        group_name: group.group_name,
        week_schedule: [],
      };
    });

    let counterId = 0;
    for (let i = 0; i < groups.length; i++) {
      const currentGroup = groups[i];

      // Filter days for the current group
      const groupDays = fetchedDays.filter(
        (day) => day.group_id.toString() === currentGroup.id.toString()
      );

      // Group days by date
      const daysByGroup = groupDays.reduce((groupedDays, day) => {
        groupedDays[day.date] = groupedDays[day.date] || [];
        groupedDays[day.date].push(day);
        return groupedDays;
      }, Object.create(null));

      // Process grouped days into a more structured format
      const dayEvents = Object.keys(daysByGroup).map((date, index) => {
        counterId++;
        const daySponsors = daysByGroup[date].flatMap((d) => d.day_sponsors);
        return {
          id: counterId,
          date: date,
          dayEvents: daysByGroup[date],
          day_sponsors: daySponsors,
        };
      });

      // Assign the processed data to the current group
      groups[i].week_schedule = dayEvents;
    }
    return groups;
  } else {
    throw new Error("Invalid data, check input and try again!");
  }
}

export function combineFoldersAndAlbums(fetchedAlbums, fetchedFolders) {
  const photoFolders = [];
  if (fetchedAlbums && fetchedFolders) {
    for (let i = 0; i < fetchedFolders.length; i++) {
      const currentFolder = {
        id: fetchedFolders[i]._id,
        year: fetchedFolders[i].year,
        folder_cover_photo: fetchedFolders[i].folder_cover_photo,
        albums: [],
      };

      const filteredAlbums = fetchedAlbums.filter(
        (a) => a.folder_id.toString() === currentFolder.id.toString()
      );
      currentFolder.albums = filteredAlbums;

      photoFolders.push(currentFolder);
    }
    return photoFolders;
  } else {
    throw new Error("Invalid data, check input and try again!");
  }
}

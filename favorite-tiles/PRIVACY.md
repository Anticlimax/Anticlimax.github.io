# Favorite Tiles Privacy Policy

**Effective date:** 2026-08-03

## Summary

Favorite Tiles is a local, movable dock for favorite bookmarks. It runs inside Chrome to show selected bookmarks as tiles on the current page. It does not provide an account, a cloud service, or a developer-operated server.

This policy describes the information Favorite Tiles accesses on a device, why it uses that information, how local storage works, and the controls available in the extension. It describes the extension's behavior; Chrome and bookmarked websites have their own policies and settings.

## Information Favorite Tiles accesses and uses

### Bookmark titles, URLs, and folder structure

Favorite Tiles reads Chrome bookmark titles, URLs, and folder structure through Chrome's bookmarks API. It uses that information only to:

- find the default **Favorites** folder or the bookmark folder selected in Settings;
- show the available bookmark folders so a user can choose one;
- create, label, order, and de-duplicate the bookmark tiles in the dock; and
- refresh an already-open dock after a bookmark or the selected folder changes.

Favorite Tiles reads bookmarks but does not create, edit, or delete them. It does not save a separate persistent copy of the bookmark tree, bookmark titles, or a bookmark list. Bookmark information is held in extension runtime memory while the dock or its supporting extension process is active.

### Page access for the cross-tab dock

Favorite Tiles runs its bundled local dock on normal HTTP and HTTPS webpages so the dock is available when a user moves across tabs. The toolbar button can hide or show the dock on the current page.

The dock is added to the page only to render its own interface. Favorite Tiles does not read or collect page text, form fields, selections, browsing history, page URL, or page title for profiling or any other purpose.

### Locally rendered favicons

For each bookmark shown in the dock, Favorite Tiles asks Chrome's built-in, extension-local `_favicon` endpoint for the bookmark's small site icon. The bookmark URL is supplied to that Chrome-internal request only so Chrome can return the icon for local display. Favorite Tiles does not send that URL to a developer-operated or third-party favicon service.

If **Icon enhancement** is enabled, Favorite Tiles may locally process the favicon pixels for display and keep an optional local icon cache. That cache contains processed icon image data and cache metadata, including an internal favicon source reference, a fingerprint, and timestamps. The internal source reference is based on the bookmarked page URL, so it can contain URL-derived information. The cache is used only to render icons faster and more consistently in the dock.

### Preferences and dock state

Favorite Tiles stores the following in Chrome's local extension storage (`chrome.storage.local`):

- the selected bookmark-folder ID, if one is chosen;
- display preferences: icon enhancement on or off, icon size, and animation preference;
- dock state: collapsed or expanded state and its normalized on-screen position; and
- the optional enhanced-favicon cache described above.

No bookmark content is used to create an account, profile, audience segment, or advertising identifier.

## Local storage, retention, and your controls

Favorite Tiles uses only Chrome's local extension storage area. It does not use `chrome.storage.sync` or a developer-operated database.

- **Preferences and dock state** remain locally stored until they are changed, the position is reset, or Chrome removes the extension's local storage under its own extension-management behavior.
- **Bookmark data** is not retained as a persistent bookmark list by Favorite Tiles. It is used in runtime memory to build or refresh the dock.
- **Optional enhanced favicon cache:** the cache is limited to 64 entries and 3 MiB. Entries older than 30 days are not used, and stale or invalid entries are removed during cache maintenance. The cache may remain until it is maintained, cleared, or Chrome removes the extension's local storage.

You can control this data in Favorite Tiles Settings:

- choose a different source folder or return to automatic folder selection;
- change icon size, icon enhancement, and animations;
- reset the dock position; and
- use **Clear icon cache** to remove the enhanced favicon cache.

You can also disable or remove the extension through Chrome. Favorite Tiles does not change the bookmarks held by Chrome.

## No collection, transmission, sale, advertising, analytics, or human access

Favorite Tiles does not collect user data for the developer or for any third party. The information described above stays within Chrome on the device for the local bookmark-dock feature.

In particular, Favorite Tiles does not:

- transmit bookmark data, page-access information, favicon data, preferences, cache data, or dock state to the developer, a third party, a web service, or a remote server;
- sell, rent, share, disclose, or otherwise make user data available to third parties;
- use data for advertising, personalized advertising, marketing, analytics, telemetry, tracking, profiling, crash reporting, or measurement;
- use remote code, third-party analytics SDKs, or a developer-operated backend; or
- allow the developer or any other human to read this data. Because it is not transmitted to a person or service, there is no human review of it.

Favorite Tiles requests access to normal HTTP and HTTPS pages only to render its dock across tabs and makes no external network requests. Its only favicon operation is the Chrome-internal `_favicon` request described above; it is not a request to an external favicon provider by the extension.

## Chrome permissions

Favorite Tiles requests the following Chrome permissions, each only for its single purpose: showing a local, movable dock for favorite bookmarks.

| Permission | Why it is used |
| --- | --- |
| `bookmarks` | Reads bookmark titles, URLs, and folder structure to choose and display favorite bookmarks. |
| `favicon` | Uses Chrome's internal favicon capability to display bookmark icons locally. |
| `storage` | Saves local preferences, dock position/state, and the optional local enhanced-favicon cache. |
| `http://*/*`, `https://*/*` | Runs the bundled local dock on normal web pages so it remains available across tabs. This access is used only to render the extension interface; Favorite Tiles does not inspect or collect webpage content. |

## Chrome Web Store Limited Use statement

> "The use of information received from Google APIs will adhere to the Chrome Web Store User Data Policy, including the Limited Use requirements."

Favorite Tiles uses the information it accesses only to provide and improve its disclosed single purpose: a local, movable dock for favorite bookmarks.

## Children

Favorite Tiles is not directed to children. It does not ask for a name, email address, age, payment information, or account. It does not transmit data from children or other users to the developer. Parents and guardians should use Chrome's own controls when deciding which extensions and bookmarks are appropriate.

## International data handling

Favorite Tiles does not operate a data-transfer service and does not send the information described in this policy between countries. Chrome and bookmarked websites are separate products and are governed by their own terms, settings, and privacy practices.

## Security

Favorite Tiles is designed so the described data remains in Chrome's extension runtime or local extension storage on the device. The extension has no server that receives this data. Device security, Chrome profile security, and Chrome itself remain important to protecting locally stored information; no software can promise absolute security.

## Changes to this policy

If Favorite Tiles changes its data practices, this policy will be updated to describe those practices and the effective date will be revised before the changed practices take effect.

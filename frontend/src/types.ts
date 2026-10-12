// The subset of the hass object that the panel uses.

export interface HassUser {
  id: string;
  name: string;
  is_admin: boolean;
}

export interface HassEntityState {
  entity_id: string;
  state: string;
  attributes: {
    friendly_name?: string;
    device_class?: string;
    unit_of_measurement?: string;
    [key: string]: unknown;
  };
}

export interface HassArea {
  area_id: string;
  name: string;
  floor_id?: string | null;
}

export interface HassFloor {
  floor_id: string;
  name: string;
  level?: number | null;
}

export interface HassEntityEntry {
  entity_id: string;
  area_id?: string | null;
  device_id?: string | null;
  hidden?: boolean;
}

export interface HassDevice {
  id: string;
  area_id?: string | null;
}

export interface HomeAssistant {
  user?: HassUser;
  language: string;
  locale?: { language: string };
  states: Record<string, HassEntityState>;
  areas: Record<string, HassArea>;
  floors?: Record<string, HassFloor>;
  entities: Record<string, HassEntityEntry>;
  devices: Record<string, HassDevice>;
  callWS<T>(msg: { type: string; [key: string]: unknown }): Promise<T>;
  callService(domain: string, service: string, data?: Record<string, unknown>): Promise<unknown>;
  fetchWithAuth(path: string, init?: RequestInit): Promise<Response>;
  /** State in the user's language (Home Assistant 2023.12 and later). */
  formatEntityState?(stateObj: HassEntityState): string;
  connection: {
    subscribeMessage<T>(callback: (msg: T) => void, msg: { type: string; [key: string]: unknown }): Promise<() => Promise<void>>;
  };
}

export interface PanelInfo {
  url_path: string;
  title: string | null;
}

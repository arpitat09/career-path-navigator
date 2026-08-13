export type StoredUser = {
  id?: string;
  _id?: string;
  name?: string;
  email?: string;
};

export function getCurrentUserId(): string | null {
  const raw = localStorage.getItem("user");

  if (!raw) {
    return null;
  }

  try {
    const user = JSON.parse(raw) as StoredUser;
    const id = user.id || user._id;

    return id ? String(id) : null;
  } catch {
    return null;
  }
}

export function getCurrentUserName(): string {
  const raw = localStorage.getItem("user");

  if (!raw) return "Learner";

  try {
    const user = JSON.parse(raw) as StoredUser;
    return user.name || user.email || "Learner";
  } catch {
    return "Learner";
  }
}

export function userPurchaseKey(courseId: string): string | null {
  const userId = getCurrentUserId();
  return userId
    ? `coursePurchased_${userId}_${courseId}`
    : null;
}

export function userProgressKey(courseId: string): string | null {
  const userId = getCurrentUserId();
  return userId
    ? `courseProgress_${userId}_${courseId}`
    : null;
}

export function userPurchasedCoursesKey(): string | null {
  const userId = getCurrentUserId();
  return userId
    ? `purchasedCourses_${userId}`
    : null;
}

export function userCertificateKey(courseId: string): string | null {
  const userId = getCurrentUserId();
  return userId
    ? `certificate_${userId}_${courseId}`
    : null;
}
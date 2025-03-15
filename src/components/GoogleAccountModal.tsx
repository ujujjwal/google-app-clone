import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { signInWithGoogle } from "../components/GoogleSignIn"; // ✅ Import existing function

const GoogleAccountModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
  const [userInfo, setUserInfo] = useState<any>(null);

  // ✅ Check if user is already signed in
  useEffect(() => {
    const checkSignIn = async () => {
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) {
        const user = await GoogleSignin.getCurrentUser();
        setUserInfo(user);
      }
    };
    checkSignIn();
  }, []);

  // ✅ Trigger Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      const firebaseUser = await signInWithGoogle();
      setUserInfo(firebaseUser);
    } catch (error) {
      Alert.alert("Sign-In Failed", "Please try again.");
    }
  };

  // ✅ Handle Google Sign-Out
  const handleSignOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUserInfo(null);
      console.log("✅ Signed Out Successfully");
    } catch (error) {
      console.error("❌ Sign-Out Error:", error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* 🔹 User Profile Section */}
          <View style={styles.profileSection}>
            <Image
              source={{ uri: userInfo?.user?.photo || "https://i.ibb.co/K2pJX3H/avatar.png" }}
              style={styles.avatar}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>{userInfo ? userInfo.user.name : "Guest User"}</Text>
              <Text style={styles.userEmail}>{userInfo ? userInfo.user.email : "Not Signed In"}</Text>
            </View>
          </View>

          {/* 🔹 Manage Account / Sign-In */}
          <TouchableOpacity
            style={styles.option}
            onPress={userInfo ? () => console.log("Manage Account") : handleGoogleSignIn}
          >
            <Text style={styles.optionText}>
              {userInfo ? "Manage your Google Account" : "Sign in with Google"}
            </Text>
          </TouchableOpacity>

          {/* 🔹 Options List */}
          {userInfo &&
            [
              { label: "Turn on Incognito", icon: "🕵️‍♂️" },
              { label: "Search history", icon: "🕰️" },
              { label: "Delete last 15 mins", icon: "🗑️" },
              { label: "SafeSearch", icon: "🛡️" },
              { label: "Interests", icon: "⭐" },
              { label: "Passwords", icon: "🔑" },
              { label: "Your profile", icon: "👤" },
              { label: "Search personalisation", icon: "⚙️" },
              { label: "Settings", icon: "⚙️" },
              { label: "Help and feedback", icon: "❓" },
            ].map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.option}
                onPress={() => console.log(`${item.label} tapped`)}
              >
                <Text style={styles.optionText}>{item.icon} {item.label}</Text>
              </TouchableOpacity>
            ))}

          {/* 🔹 Sign Out Button */}
          {userInfo && (
            <TouchableOpacity style={styles.option} onPress={handleSignOut}>
              <Text style={[styles.optionText, { color: "red" }]}>Sign Out</Text>
            </TouchableOpacity>
          )}

          {/* 🔹 Bottom Links */}
          <View style={styles.bottomLinks}>
            <Text style={styles.linkText}>Privacy Policy</Text>
            <Text style={styles.linkText}>•</Text>
            <Text style={styles.linkText}>Terms of Service</Text>
          </View>

          {/* 🔹 Close Button */}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default GoogleAccountModal;

// 🔥 Styling
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#2a2c2f",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
    paddingBottom: 25,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  userEmail: {
    fontSize: 14,
    color: "#bbb",
  },
  option: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  optionText: {
    fontSize: 15,
    color: "#fff",
  },
  bottomLinks: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  linkText: {
    fontSize: 13,
    color: "#aaa",
    marginHorizontal: 5,
  },
  closeButton: {
    marginTop: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  closeText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "600",
  },
});
